import { createRoot } from "react-dom/client";
import { KcPage } from "./kc.gen";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

/*
// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
import { getKcContextMock } from "./login/KcPageStory";

if (process.env.NODE_ENV === "development") {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

createRoot(document.getElementById("root")!).render(
    <>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} fallback={<LoadingSpinner />} />
        )}
    </>
);
