import { useState, useEffect, useReducer } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "../../components/ui/PasswordWrapper";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
import { XCircle } from "lucide-react";
export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { realm, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                    >
                        {/* Error Alert at the top */}
                        {messagesPerField.existsError("password") && (
                            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                                <div
                                    className="text-sm text-red-800 dark:text-red-200 flex-1"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: messagesPerField.get("password")
                                    }}
                                />
                            </div>
                        )}

                        <div className={cn()}>
                            {/* <hr /> */}
                            <label htmlFor="password" className={cn()}>
                                {msg("password")}
                            </label>

                            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                <Input
                                    tabIndex={2}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoFocus
                                    autoComplete="on"
                                    className={messagesPerField.existsError("password") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                            </PasswordWrapper>
                        </div>
                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                            <div id="kc-form-options" />
                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                {realm.resetPasswordAllowed && (
                                    <span>
                                        <a
                                            tabIndex={5}
                                            href={url.loginResetCredentialsUrl}
                                            className={cn(buttonVariants({ variant: "link" }), "underline px-0 mt-2")}
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                            <input
                                tabIndex={4}
                                // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                className={cn(buttonVariants(), "w-full")}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                disabled={isLoginButtonDisabled}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
