type ConfirmConfig = {
    title: string
    text: string
    detail?: any
    mustType?: string
    onConfirm: (detail: any) => void
}

type ConfirmStoreState = {
    state: null | ConfirmConfig
}

export const confirmStore = $state<ConfirmStoreState>({
    state: null
})

export const openConfirmModal = (config: ConfirmConfig) => {
    confirmStore.state = config
}