// CONFIRM

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

// RESET PASSWORD

type ResetPasswordConfig = {
    open: boolean
}

type ResetPasswordState = {
    state: null | ResetPasswordConfig
}

export const resetPasswordStore = $state<ResetPasswordState>({
    state: null
})
