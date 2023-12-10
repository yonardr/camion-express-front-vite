import {computed, watch} from "vue";

export function useAnimationSubmit(init ={}){
    const view = computed(()=>{
        if(init.value) return {display: 'inline-block'}
        else return {display: 'none'}
    })
    const noview = computed( () => {
        if(init.value) return {display: 'none'}
        else return {display: 'inline-block'}
    })
    const green = computed( () =>{
        if(init.value) return {
            'border-color' : 'rgba(0, 255, 0, 0.4)',
            'background-color': 'rgba(0, 255, 0, 0.3)',
        }
    }
)
    return {view, noview, green}
}