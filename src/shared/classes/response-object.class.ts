import { HttpStatus } from "@nestjs/common";

class BodyObject {
    message?: string
    data?: any
}

export class ResponseObject {
    status: HttpStatus
    data?: BodyObject

    constructor(
        status: HttpStatus,
        data?: BodyObject
    ) {
        this.status = status
        this.data = data
    }
}