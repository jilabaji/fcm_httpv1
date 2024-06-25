import { options } from "../entity/options";
import { fcmHost } from "../constants";
import { FcmServiceAccount } from "../entity/service.account";
import { JWT } from 'google-auth-library';
import { FCMtoken } from "../entity/tokenEntity";
import { Message } from "../entity/messageEntity";
import { fcmapiv1 } from "./connector";

export class FCM {
    private host: string = fcmHost;
    private tokenObj: FCMtoken|undefined = undefined;
    private reqpath: string = ''

    /**
     * Options to set service account file.
     */
    private readonly fcmOptions: options = new options();

    constructor(input?: options) {
        if (input) {
            this.fcmOptions.serviceAccount = input.serviceAccount
            this.reqpath = `/v1/projects/${this.fcmOptions.serviceAccount?.project_id}/messages:send`
        }

        if (!this.fcmOptions.serviceAccount) {
            throw new Error(`Please Provide the Service Account JSON file`)
        }
    }

    getAccessToken = async () => {
        try {
            const toekn = await this.accessToken(this.fcmOptions.serviceAccount!!)
            this.tokenObj = toekn;

        } catch (error) {
            console.log('4')

            return error
        }
    }

    private accessToken = async (serviceAccount: FcmServiceAccount) => {
        return new Promise<FCMtoken|undefined>((resolve, reject) => {
            const SCOPES = [
                'https://www.googleapis.com/auth/cloud-platform',
                'https://www.googleapis.com/auth/firebase.messaging',
            ]
            const jwtClient = new JWT({
                email: serviceAccount.client_email,
                key: serviceAccount.private_key,
                scopes: SCOPES,
            });

            jwtClient.authorize(function (err, tokens) {
                if (err) {
                    reject(err);
                    return;
                }
                if (tokens && tokens.access_token) {
                    resolve(tokens);
                } else {
                    reject(new Error('No access token found in the tokens object.'));
                }
            });
        });
    }

    sendToFCM = async (message: Message) => {
        const token = await this.accessToken(this.fcmOptions.serviceAccount!!)
        if (token && token.access_token) {
            let response: any = await fcmapiv1('post',this.reqpath,message,token.access_token);
            if(response.status == 200){
                return {
                    'pushMessage': 'success',
                    'fcmResponse': response
                }
            }else{
                return {
                    'pushMessage': 'failed',
                    'fcmResponse': response
                }
            }
        }else{
            console.log('Token Error')
            throw new Error('Token Genration is failed please correct the service account Json file')
        }

    }
}