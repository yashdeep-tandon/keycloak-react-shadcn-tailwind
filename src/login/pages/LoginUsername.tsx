import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../../components/ui/input";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { checkboxVariants } from "../../components/ui/checkbox";
import { SocialProviders } from "../../components/ui/SocialProviders";
import { XCircle } from "lucide-react";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        <div className="flex items-center ">
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl} className={cn(buttonVariants({ variant: "link" }), "underline px-2 mb-0.5")}>
                                {msg("doRegister")}
                            </a>
                        </div>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={<SocialProviders social={social} kcClsx={kcClsx} clsx={clsx} msg={msg} realm={realm} />}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
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
                            {messagesPerField.existsError("username") && (
                                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30 mb-4">
                                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-red-800 dark:text-red-200 flex-1" aria-live="polite">
                                        {messagesPerField.getFirstError("username")}
                                    </div>
                                </div>
                            )}

                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label>
                                    <Input
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="off"
                                        className={messagesPerField.existsError("username") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                </div>
                            )}

                            <div>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    tabIndex={3}
                                                    className={checkboxVariants({})}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input
                                    tabIndex={4}
                                    disabled={isLoginButtonDisabled}
                                    // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    className={cn(buttonVariants({}), "w-full")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
