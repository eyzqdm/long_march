import axios from 'axios';
import { message } from 'ant-design-vue';
// 创建axios实例
const service = axios.create({
    // 在请求地址前面加上baseURL
    baseURL: 'http://127.0.0.1:3000',
    // 当发送跨域请求时携带cookie
    // withCredentials: true,
    timeout: 5000,
})

// 请求拦截
service.interceptors.request.use(
    (config) => {
        // 指定请求令牌
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers["authorization"] = 'Bearer'+' '+token
        }
        return config;
    },
    (error) => {
        // 请求错误的统一处理
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * 通过判断状态码统一处理响应，根据情况修改
     * 同时也可以通过HTTP状态码判断请求结果
     */
    (response) => {
        const res = response.data;

        // 如果状态码不是20000则认为有错误
        if (res.code !== 0) {
            message.error({
                message: res.message || "Error",
                duration: 5 * 1000,
            });

            // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // 重新登录
                /*  Msgbox.confirm("您已登出, 请重新登录", "确认", {
                     confirmButtonText: "重新登录",
                     cancelButtonText: "取消",
                     type: "warning",
                 }).then(() => {
                     store.dispatch("user/resetToken").then(() => {
                         location.reload();
                     });
                 }); */
            }
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res;
        }
    },
    (error) => {
        console.log("err" + error); // for debug
        /*  essage({
             message: error.message,
             type: "error",
             duration: 5 * 1000,
         }); */
        return Promise.reject(error);
    }
);
export function request(data: any) {
    return service(data)
}
export function get(url: string, params: any) {
    return request({
        url: url,
        params: params,
        method: 'get'
    })
}

export function post(url: string, params: any) {
    return request({
        url: url,
        data: params,
        method: 'post'
    })
}
export default service;
