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
      <div className={cn("bg-[#1C1C1E] w-[500px]  shadow-xl p-4")}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Build Steps</h2>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </div>
        <div className="mt-3 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center p-2  bg-[#2C2C2E]/50">
              <div className="h-4 w-3/4 rounded animate-pulse bg-gradient-to-r from-[#2C2C2E] to-[#3C3C3E]" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#1C1C1E] w-[500px]   shadow-xl p-4 overflow-hidden">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="text-xl font-semibold text-white">Build Steps</h2>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-white/70 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </div>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isExpanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-[#2C2C2E] transition-colors"
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
