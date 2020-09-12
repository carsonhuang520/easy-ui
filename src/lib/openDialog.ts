import { createApp, h } from 'vue';
import Dialog from '../lib/Dialog.vue'
export const openDialog = (options) => {
    const { title, content, handleConfirm, handleCancel, closeOverlay } = options
    const div = document.createElement("div")
    document.body.appendChild(div)
    const close = () => {
        app.unmount(div)
        div.remove()
    }
    const app = createApp({
        render() {
            return h(Dialog, {
                visible: true,
                closeOverlay,
                "onUpdate:visible": (newValue) => {
                    if(newValue === false) {
                        close()
                    }
                },
                handleConfirm,
                handleCancel
            }, {
                title,
                content
            })
        }
    })
    app.mount(div)
}