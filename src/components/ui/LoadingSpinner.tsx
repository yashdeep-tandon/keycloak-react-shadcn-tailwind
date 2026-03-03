import { Loader2 } from "lucide-react";
import "../../styles/global.css";

export function LoadingSpinner() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center onboarding-gradient">
            <div className="flex flex-col items-center space-y-4 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse"></div>
                    <Loader2
                        className="h-16 w-16 text-primary animate-spin relative"
                        strokeWidth={2.5}
                    />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-foreground">Loading...</p>
                    <p className="text-sm text-muted-foreground">Please wait a moment</p>
                </div>
            </div>
        </div>
    );
}
