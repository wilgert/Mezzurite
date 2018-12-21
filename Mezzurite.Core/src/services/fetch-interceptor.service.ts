export class FetchInterceptor{
    key: string;
    constantMock: any;
    constructor(id: string){
        this.key = id;
        const constantMock = window.fetch;
        const _this = this;
        window.fetch = function(){
            return new Promise(function(resolve, reject){
                constantMock.apply(window, arguments)
                .then((response: any) => {
                    console.log("fetch interceptor response in " + _this.key);
                    console.log("response: ", response);
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                })
            })
        }
        // window.fetch = function(){
        //     console.log("fetch interceptor in " + _this.key)
        //     return constantMock.apply(this, arguments);
        // }
        // window.fetch = function(){
        //     console.log(arguments);
        //     return new Promise(function(resolve, reject){
        //         _this.constantMock.apply(_this, )
        //     })
        // }
    }

}