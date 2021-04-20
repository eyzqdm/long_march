import { ref } from "vue";

export function useNum(){

    const num = ref(0)
    const changeNum = () => {
        console.log('asd')
        num.value++
    }
    return {
        num,
        changeNum
    }
}