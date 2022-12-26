
import {Translation} from "react-i18next";

export function TranslationI18N(value){
    return <Translation>{(t,{i18n}) => <span>{t(value)}</span>}</Translation>
}