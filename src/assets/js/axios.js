import axios from "axios";
// 用于存储目前状态为pending的请求标识信息
let pendingRequest = [];
const allowDoubleRequest = [];
/**
 * 请求的拦截处理
 * @param config - 请求的配置项
 */
const handleRequestIntercept = config => {
    // 区别请求的唯一标识，这里用方法名+请求路径
    // 如果一个项目里有多个不同baseURL的请求
    // 可以改成`${config.method} ${config.baseURL}${config.url}`
    const requestMark = `${config.method} ${config.url}`;
    // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
    const markIndex = pendingRequest.findIndex(item => {
        return item.name === requestMark;
    });
    // eslint-disable-next-line no-console
    // console.log(requestMark);
    // 存在，即重复了
    if (markIndex > -1 && !allowDoubleRequest.includes(requestMark)) {
        // 取消上个重复的请求
        pendingRequest[markIndex].cancel();
        // 删掉在pendingRequest中的请求标识
        pendingRequest.splice(markIndex, 1);
    }
    // （重新）新建针对这次请求的axios的cancelToken标识
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    config.cancelToken = source.token;
    // 设置自定义配置requestMark项，主要用于响应拦截中
    config.requestMark = requestMark;
    // 记录本次请求的标识
    pendingRequest.push({
        name: requestMark,
        cancel: source.cancel,
        routeChangeCancel: config.routeChangeCancel // 可能会有优先级高于默认设置的routeChangeCancel项值
    });
    return config;
};

/**
 * 响应的拦截处理
 * @param config - 请求的配置项
 */
const handleResponseIntercept = config => {
    // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
    const markIndex = pendingRequest.findIndex(item => {
        return item.name === config.requestMark;
    });
    // 找到了就删除该标识
    markIndex > -1 && pendingRequest.splice(markIndex, 1);
};

/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use(handleRequestIntercept, err =>
    Promise.reject(err)
);

/* 请求之后的操作 */
axios.interceptors.response.use(
    res => {
        handleResponseIntercept(res.config);
        return res;
    },
    error => {
        let errorFormat = {};
        const response = error.response;
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        if (response) {
            handleResponseIntercept(response.config);
            // 设置返回的错误对象格式（按照自己项目实际需求）
            errorFormat = {
                status: response.status,
                data: response.data
            };
        }
        // 如果是主动取消了请求，做个标识
        if (axios.isCancel(error)) {
            errorFormat.selfCancel = true;
        }
        return Promise.reject(errorFormat);
    }
);

function post(
    params = {
        url: "",
        data: {},
        config: {}
    }
) {
    return new Promise((resolve, reject) => {
        axios
            .post(params.url, params.data, params.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function get(
    params = {
        url: "",
        data: {}
    }
) {
    return new Promise((resolve, reject) => {
        axios
            .get(params.url, {
                params: params.data
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function put(
    params = {
        url: "",
        data: {}
    }) {
    return new Promise((resolve, reject) => {
        axios
            .put(params.url, params.data)
            .then(res => {
                if (res.data.code === "1") {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
export {
    post,
    get,
    put,
    pendingRequest
};