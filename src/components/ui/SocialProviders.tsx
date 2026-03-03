import React from "react";
import { clsx } from "keycloakify/tools/clsx";
import {
    FaGoogle,
    FaMicrosoft,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaStackOverflow,
    FaGitlab,
    FaBitbucket,
    FaPaypal,
    FaInstagram
} from "react-icons/fa";
import { SiRedhatopenshift } from "react-icons/si";

// Helper function to get the appropriate brand icon
const getBrandIcon = (alias: string, iconClasses?: string) => {
    const aliasLower = alias.toLowerCase();
    const iconSize = "1.25rem"; // h-5 w-5 equivalent

    const iconMap: Record<string, JSX.Element> = {
        google: <FaGoogle size={iconSize} />,
        microsoft: <FaMicrosoft size={iconSize} />,
        facebook: <FaFacebook size={iconSize} />,
        twitter: <FaTwitter size={iconSize} />,
        linkedin: <FaLinkedin size={iconSize} />,
        "linkedin-openid-connect": <FaLinkedin size={iconSize} />,
        github: <FaGithub size={iconSize} />,
        stackoverflow: <FaStackOverflow size={iconSize} />,
        gitlab: <FaGitlab size={iconSize} />,
        bitbucket: <FaBitbucket size={iconSize} />,
        paypal: <FaPaypal size={iconSize} />,
        openshift: <SiRedhatopenshift size={iconSize} />,
        "openshift-v3": <SiRedhatopenshift size={iconSize} />,
        "openshift-v4": <SiRedhatopenshift size={iconSize} />,
        instagram: <FaInstagram size={iconSize} />
    };

    // Try to match by alias first
    if (iconMap[aliasLower]) {
        return <div className="inline-flex items-center">{iconMap[aliasLower]}</div>;
    }

    // Try to match by checking if alias contains the provider name
    for (const [key, icon] of Object.entries(iconMap)) {
        if (aliasLower.includes(key)) {
            return <div className="inline-flex items-center">{icon}</div>;
        }
    }

    // Fallback to Font Awesome icon classes if provided
    if (iconClasses) {
        return <i className={clsx(iconClasses)} aria-hidden="true"></i>;
    }

    // Default fallback - no icon
    return null;
};

export interface SocialProvidersProps {
    social: {
        providers?: Array<{
            alias: string;
            loginUrl: string;
            displayName: string;
            iconClasses?: string;
        }>;
    };
    kcClsx: (...args: any[]) => string;
    clsx: (...args: any[]) => string;
    msg: any;
    realm: {
        password: boolean;
    };
}

export const SocialProviders: React.FC<SocialProvidersProps> = ({
    social,
    kcClsx,
    clsx,
    msg,
    realm
}) => {
    const providers = social.providers || [];

    return (
        realm.password &&
        providers.length > 0 && (
            <>
                {realm.password &&
                    social.providers !== undefined &&
                    social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="mt-6 space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-4 text-muted-foreground font-medium">
                                        {msg("identity-provider-login-label")}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    "grid gap-3", // Apply a grid and gap between items
                                    social.providers.length > 1
                                        ? "grid-cols-1 md:grid-cols-2"
                                        : "grid-cols-1" // Conditional grid columns
                                )}
                            >
                                {social.providers.map((...[p, , providers]) => (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        href={p.loginUrl}
                                        className="group relative flex items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    >
                                        <div className="flex items-center justify-center text-muted-foreground transition-colors group-hover:text-primary">
                                            {getBrandIcon(p.alias, p.iconClasses)}
                                        </div>
                                        <span
                                            className="text-foreground transition-colors group-hover:text-primary"
                                            dangerouslySetInnerHTML={{
                                                __html: p.displayName
                                            }}
                                        ></span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
            </>
        )
    );
};

export default SocialProviders;
// <div
//     id="kc-social-providers"
//     className={kcClsx("kcFormSocialAccountSectionClass")}
// >
//     <hr />
//     <h2>{msg("identity-provider-login-label")}</h2>
//     <ul
//         className={kcClsx(
//             "kcFormSocialAccountListClass",
//             providers.length > 3 && "kcFormSocialAccountListGridClass"
//         )}
//     >
//         {providers.map(p => (
//             <li key={p.alias}>
//                 <a
//                     id={`social-${p.alias}`}
//                     className={kcClsx(
//                         "kcFormSocialAccountListButtonClass",
//                         providers.length > 3 && "kcFormSocialAccountGridItem"
//                     )}
//                     type="button"
//                     href={p.loginUrl}
//                 >
//                     {p.iconClasses && (
//                         <i
//                             className={clsx(
//                                 kcClsx("kcCommonLogoIdP"),
//                                 p.iconClasses
//                             )}
//                             aria-hidden="true"
//                         ></i>
//                     )}
//                     <span
//                         className={clsx(
//                             kcClsx("kcFormSocialAccountNameClass"),
//                             p.iconClasses && "kc-social-icon-text"
//                         )}
//                         dangerouslySetInnerHTML={{ __html: p.displayName }}
//                     />
//                 </a>
//             </li>
//         ))}
//     </ul>
// </div>
