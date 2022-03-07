import {
    Dialog
} from 'vant';
import Vue from 'vue';
const { confirm } = Dialog
 const Model = {
    mutations:{
        opneDialog() {
            confirm({
                title: '提示',
                message: '您有新消息，是否前往查看?'
            }).then(() => {
                Vue.$router.push('/notice').catch(err => {err});
            }).catch(() => {
                return;
            })
        }
    }
}

export default Model