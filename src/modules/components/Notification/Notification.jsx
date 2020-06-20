import { Notyf } from 'notyf';

/** Created by Felipe M. Santos 
 * Simple Notification using notyf
*/

export default function sendNotification(type, message, duration){
    let notyf = new Notyf();
    if (type === 'success') {
        notyf.success({
            message: message,
            duration: duration
        })
    }
    if (type === 'error') {
        notyf.error({
            message: message,
            duration: duration
        })
    }
}