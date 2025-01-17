import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { Step } from "@/types";

export function StepsList({
  steps,
  isloading,
}: {
  steps: Step[];
  isloading: Boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (isloading) {
    return (
      <div className="w-80 p-4 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-slate-700/50 animate-pulse" />
          <div className="h-5 w-5 rounded bg-slate-700/50 animate-pulse" />
        </div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-md bg-slate-700/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/5">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between group"
        >
          <h2 className="text-sm font-medium text-slate-200 tracking-wide uppercase">
            Build Steps
          </h2>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-slate-400 transition-all duration-300 ease-spring",
              isExpanded && "-rotate-180",
              "group-hover:text-slate-200"
            )}
          />
        </button>

        <div
          className={cn(
            "transition-all duration-300 ease-spring",
            isExpanded
              ? "mt-3 opacity-100"
              : "h-0 mt-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="space-y-1.5">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "relative group px-3 py-2 rounded-md",
                  "transition-all duration-200",
                  "hover:bg-white/5 active:bg-white/10",
                  "cursor-pointer"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-300">
                      {index + 1}
                    </span>
                  </div>

                  <span className="text-sm text-slate-300 group-hover:text-slate-100">
                    {step.title}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-md ring-1 ring-white/5 group-hover:ring-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsList;
