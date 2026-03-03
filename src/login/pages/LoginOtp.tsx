import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import clsx from "clsx";
import { XCircle, Smartphone, Shield, Key } from "lucide-react";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const getDeviceIcon = (index: number) => {
        const iconClass = "h-5 w-5 text-primary";
        const icons = [Smartphone, Shield, Key];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className={iconClass} />;
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                {/* Error Alert at the top */}
                {messagesPerField.existsError("totp") && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30 mb-4">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                        <div
                            className="text-sm text-red-800 dark:text-red-200 flex-1"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("totp")
                            }}
                        />
                    </div>
                )}

                {otpLogin.userOtpCredentials.length > 1 && (
                    <div>
                        <div>
                            <div className="grid grid-cols-1  md:grid-cols-2 gap-1 my-5">
                                {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                    <Fragment key={index}>
                                        {/* <div className="flex flex-row items-center space-x-2"> */}
                                        <div className="flex items-center ">
                                            <input
                                                id={`kc-otp-credential-${index}`}
                                                className=" "
                                                // className={kcClsx("kcLoginOTPListInputClass")}
                                                type="radio"
                                                name="selectedCredentialId"
                                                value={otpCredential.id}
                                                defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                            />

                                            <label htmlFor={`kc-otp-credential-${index}`} tabIndex={index} className="mx-3">
                                                <div className="flex space-x-3 text-xl items-center">
                                                    <span>{getDeviceIcon(index)}</span>
                                                    <span className="">{otpCredential.userLabel}</span>
                                                </div>
                                            </label>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                            {msg("loginOtpOneTime")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <Input
                            id="otp"
                            name="otp"
                            autoComplete="off"
                            type="text"
                            className={messagesPerField.existsError("totp") ? "mt-2 border-red-500 focus-visible:ring-red-500" : "mt-2"}
                            autoFocus
                            aria-invalid={messagesPerField.existsError("totp")}
                        />
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            //className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            className={clsx(buttonVariants(), "w-full")}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
