import { FcmServiceAccount } from "./service.account"

export class options {
    serviceAccount?: FcmServiceAccount

    constructor(entity?: options){
        if(entity){
            this.serviceAccount = entity.serviceAccount
        }
    }
}