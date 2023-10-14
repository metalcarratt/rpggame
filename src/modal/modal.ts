import { Ref, ref } from "vue";
import { xyd } from "@/level/util";

export type ModalInput = {
    title: string,
    name: string,
    value: string
}

export type ModalDetails = {
    inputs: ModalInput[],
    title: () => string,
    onSubmit: (at: xyd, inputs: ModalInput[]) => void
}

const modalActive = ref(false);
const _modalDetails: Ref<ModalDetails | null> = ref(null);
let _at: xyd | null = null;

export const isModalActive = () => modalActive.value;

export const getInputs = () => _modalDetails.value?.inputs;

export const getTitle = () => _modalDetails.value?.title();

export const startModal = (modalDetails: ModalDetails, at: xyd) => {
    console.log(`action modal: ${JSON.stringify(modalDetails)}`);
    modalActive.value = true;
    _modalDetails.value = modalDetails;
    _at = JSON.parse(JSON.stringify(at));
}

export const submitModal = () => {
    modalActive.value = false;
    if (_modalDetails.value && _at) {
        _modalDetails.value.onSubmit(_at, _modalDetails.value.inputs);
    }
}

export const cancelModal = () => {
    modalActive.value = false;
}