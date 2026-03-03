import { getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { TextDisplay } from "../../components/ui/TextDisplay";
import { checkboxVariants } from "../../components/ui/checkbox";
import { XCircle } from "lucide-react";
export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol id="kc-totp-settings">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <TextDisplay>
                                        <span>{totp.totpSecretEncoded}</span>
                                    </TextDisplay>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <p>
                                    <ul>
                                        <li id="kc-totp-type">
                                            {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                        </li>
                                        <li id="kc-totp-algorithm">
                                            {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                        </li>
                                        <li id="kc-totp-digits">
                                            {msg("loginTotpDigits")}: {totp.policy.digits}
                                        </li>
                                        {totp.policy.type === "totp" ? (
                                            <li id="kc-totp-period">
                                                {msg("loginTotpInterval")}: {totp.policy.period}
                                            </li>
                                        ) : (
                                            <li id="kc-totp-counter">
                                                {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                            </li>
                                        )}
                                    </ul>
                                </p>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                            <br />
                            <p>
                                <a href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-totp-settings-form" method="post">
                    {/* Error Alert at the top */}
                    {messagesPerField.existsError("totp", "userLabel") && (
                        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30 mb-4">
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                            <div
                                className="text-sm text-red-800 dark:text-red-200 flex-1"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.getFirstError("totp", "userLabel")
                                }}
                            />
                        </div>
                    )}

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="totp" className={kcClsx("kcLabelClass")}>
                                {msg("authenticatorCode")}
                            </label>{" "}
                            <span className="required">*</span>
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <Input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                className={messagesPerField.existsError("totp") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={messagesPerField.existsError("totp")}
                            />
                        </div>
                        <Input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="userLabel" className={kcClsx("kcLabelClass")}>
                                {msg("loginTotpDeviceName")}
                            </label>{" "}
                            {totp.otpCredentials.length >= 1 && <span className="required">*</span>}
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <Input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                className={
                                    messagesPerField.existsError("userLabel") ? "border-red-500 focus-visible:ring-red-500" : kcClsx("kcInputClass")
                                }
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                        </div>
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    </div>

                    {isAppInitiatedAction ? (
                        <div className="flex space-x-2 items-center justify-between">
                            <input
                                type="submit"
                                // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                className={`${buttonVariants({})} w-full`}
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                            />
                            <button
                                type="submit"
                                // className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass", "kcButtonLargeClass")}
                                className={`${buttonVariants({ variant: "outline" })} w-full`}
                                id="cancelTOTPBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button>
                        </div>
                    ) : (
                        <input
                            type="submit"
                            className={`${buttonVariants({})} w-full`}
                            // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                            id="saveTOTPBtn"
                            value={msgStr("doSubmit")}
                        />
                    )}
                </form>
            </>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div>
                <div className="checkbox flex items-center text-foreground">
                    <div className="flex items-center ml-5 space-x-2 ">
                        <input type="checkbox" className={`${checkboxVariants({})}`} name="logout-sessions" value="on" defaultChecked={true} />
                        <span className="">{msg("logoutOtherSessions")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
