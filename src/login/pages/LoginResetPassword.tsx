import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
import { XCircle } from "lucide-react";
export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                {/* Error Alert at the top */}
                {messagesPerField.existsError("username") && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30 mb-4">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                        <div
                            className="text-sm text-red-800 dark:text-red-200 flex-1"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("username")
                            }}
                        />
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            className={messagesPerField.existsError("username") ? "border-red-500 focus-visible:ring-red-500" : ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                    </div>
                </div>
                <div>
                    <div id="kc-form-options">
                        <div>
                            <span>
                                <a href={url.loginUrl} className={cn(buttonVariants({ variant: "link" }), "underline p-0 ")}>
                                    {msg("backToLogin")}
                                </a>
                            </span>
                        </div>
                    </div>

                    <div id="kc-form-buttons" className="">
                        <input
                            // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            className={cn(buttonVariants({ variant: "default" }), "w-full ")}
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
