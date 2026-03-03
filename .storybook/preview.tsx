import React from "react"; // Add this import at the top
import type { Preview } from "@storybook/react-webpack5";
import { themes } from "storybook/theming";
import { ModeDecorator } from "./modeDecorator";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import "./../src/styles/global.css";
import { Provider } from "react-redux";

// export const decorators = [ModeDecorator];
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        viewport: {
            options: MINIMAL_VIEWPORTS
        }
    },

    initialGlobals: {
        viewport: {
            value: "ipad",
            isRotated: false
        }
    }
};

export default preview;
