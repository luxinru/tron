<template>
    <div class="page">
        <p class="title">您是通过哪儿看到APP的呢？</p>
        <textarea type="text" v-model="question" placeholder="请在此填写您的答案"></textarea>
        <p class="title">说明</p>
        <textarea type="text" v-model="explain" placeholder="请在此填写您的说明"></textarea>
        <div class="submint-btn" @click="submit">提交</div>
        <p class="thinks">十分感谢您对本次调查的支持和配合！</p>
    </div>
</template>

<script>
	import Fetch from '../../utils/fetch'
export default {
    name: 'questionnaire',
    data() {
        return {
            question: '',
            explain: ''
        }
    },
    methods: {
        async submit() {
            try {
                await this.checkRequire()
            } catch(error) {
                return this.$notify(error)
            }
			
            Fetch("/user/set_investigation", {
            	answer: this.question,
            	explain: this.explain,
            }).then(() => {
            	this.$notify({
            		background: '#07c160',
            		message: '回答成功'
            	});
            	this.$router.replace('/home');
            })
        },
        checkRequire() {
            const errorObj = {
                question: '请输入答案',
                explain: '请输入评价'
            }
            for (let [key, value] of Object.entries(errorObj)) {
                if (!this[key]) {
                    return Promise.reject(value)
                }
            }
            return Promise.resolve('ok')
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    height: 100%;
    background-color: #F7F7F7;
    padding: 30px 13px;
    font-family: PingFang SC;
    .title{
        font-size: 16px;
        font-weight: 500;
        color: #000000;
    }
    textarea{
        margin-top: 14px;
        padding: 15px 16px;
        background: #FCFBFC;
        font-size: 14px;
        font-weight: 400;
        color: #B5B5B5;
        width: 100%;
        margin-bottom: 32px;
    }
    .submint-btn{
        width: 348px;
        line-height: 47px;
        background-color: #0F79FF;
        border-radius: 13px;
        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }
    .thinks{
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        margin-top: 25px;
    }
}
</style>