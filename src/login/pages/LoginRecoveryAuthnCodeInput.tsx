import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { XCircle } from "lucide-react";
export default function LoginRecoveryAuthnCodeInput(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <form id="kc-recovery-code-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                {/* Error Alert at the top */}
                {messagesPerField.existsError("recoveryCodeInput") && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30 mb-4">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                        <div
                            className="text-sm text-red-800 dark:text-red-200 flex-1"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("recoveryCodeInput")
                            }}
                        />
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="recoveryCodeInput" className={kcClsx("kcLabelClass")}>
                            {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <Input
                            tabIndex={1}
                            id="recoveryCodeInput"
                            name="recoveryCodeInput"
                            aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                            autoComplete="off"
                            type="text"
                            className={
                                messagesPerField.existsError("recoveryCodeInput")
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : kcClsx("kcInputClass")
                            }
                            autoFocus
                        />
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsWrapperClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input className={cn(buttonVariants({}), "w-full")} name="login" id="kc-login" type="submit" value={msgStr("doLogIn")} />
                    </div>
                </div>
            </form>
        </Template>
    );
}
