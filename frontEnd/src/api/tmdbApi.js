import axiosClient from "./axiosClient";


export const route = {
    login: 'login',
    register: 'register',
    lists:'lists',
    tasks:"lists/task",

}

const tmdbApi = {
    login: (data) => {
        const url = 'auth/' + route.login;
        // console.log(url+params)
        return axiosClient.post(url, data);
    },
    register: (data) => {
        const url = 'auth/' + route.register;
        return axiosClient.post(url, data);
    },
    postlist: (data,config) => {
        const url =`/${route.lists}`;
        return axiosClient.post(url,data,config);
    },
    deleteList: (listId,config) => {
        const url = `/${route.lists}/${listId}`;
        return axiosClient.delete(url,config);
    },
    getList: (config) => {
        const url = `/${route.lists}`;
        return axiosClient.get(url,config);
    },
    postTask: (data,_listId,config) => {
        const url = `/${route.tasks}/${_listId}/task`;
        return axiosClient.post(url,data,config);
    },
    getAllTasks: (_listId,config) => {
        const url =`/${route.tasks}/${_listId}/task`;
        return axiosClient.get(url,config);
    },
    getTask: (_listId,taskId,config) => {
        const url =`/${route.tasks}/${_listId}/task/${taskId}`;
        return axiosClient.get(url,config);
    },
    patchTask: (_listId,taskId,data,config) => {
        const url =`/${route.tasks}/${_listId}/task/${taskId}`;
        return axiosClient.patch(url,data,config);
    },
    putTask: (_listId,taskId,data,config) => {
        const url =`/${route.tasks}/${_listId}/task/${taskId}`;
        return axiosClient.put(url,data,config);
    },
    deleteTask: (_listId,taskId,config) => {
        const url =`/${route.tasks}/${_listId}/task/${taskId}`;
        return axiosClient.delete(url,config);
    },
}
export default tmdbApi;