import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
class ValidationPipe implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata): any {
        return undefined;
    }

}