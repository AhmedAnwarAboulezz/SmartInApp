import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

// @Injectable({
//   providedIn: 'root',
// })
// export class IonicStorageService {
//   constructor() {} //private storage: Storage

//   async set(key?: string, value?: any) {
//     value = btoa(value);
//     await Storage.set({
//       key,
//       value,
//     });
//     // await Storage.set({
//     //     key,
//     //     value
//     // });
//   }
//   async setObject(key?: string, value?: any) {
//     // await Storage.set({
//     //     key,
//     //     value: JSON.stringify(value)
//     // });
//     await Storage.set({
//       key,
//       value: encodeURIComponent(JSON.stringify(value)),
//       //btoa(JSON.stringify(value))
//     });
//   }

//   async get(key?: string) {
//     const result = await Storage.get({ key });
//     result.value =
//       result.value !== null && result.value !== ''
//         ? atob(result.value)
//         : result.value;
//     return result;
//   }

//   async getObject(key?: string) {
//     const ret = await Storage.get({ key });
//     //return JSON.parse(ret.value);
//     return JSON.parse(decodeURIComponent(ret.value));
//     //return JSON.parse(atob(ret.value));
//   }
//   async removeItem(key?: string) {
//     await Storage.remove({ key });
//   }

//   async keys() {
//     const { keys } = await Storage.keys();
//     return keys;
//   }

//   async clear() {
//     await Storage.clear();
//   }

@Injectable({
    providedIn: 'root'
})
export class IonicStorageService {
    constructor() { }

    async set(key?: string, value?: any) {
        value = btoa(value);
        await Storage.set({
            key,
            value
        });
    }
    async setObject(key?: string, value?: any) {
        await Storage.set({
            key,
            value: encodeURIComponent(JSON.stringify(value))
        });
    }

    async get(key?: string) {
        const result = await Storage.get({ key });
        result.value = result.value !== null && result.value !== "" ? atob(result.value) : result.value; 
        return result;
    }

    async getObject(key?: string) {
        const ret = await Storage.get({ key });
        return JSON.parse(decodeURIComponent(ret.value));
    }
    async removeItem(key?: string) {
        await Storage.remove({ key });
    }

    async keys() {
        const { keys } = await Storage.keys();
        return keys;
    }

    async clear() {
        await Storage.clear();
    }

}
