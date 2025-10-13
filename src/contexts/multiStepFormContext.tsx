import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// Generic context type
export type MultiStepFormContextType<T> = {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepsCount: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateStepsCount: (steps: number) => void;
  sharedData: T;
  updateSharedData: (params: {
    data: T | Partial<T>;
    method?: "merge" | "replace";
  }) => void;
};

// Internal non-generic context
const InternalMultiStepFormContext =
  createContext<MultiStepFormContextType<unknown> | null>(null);

// ✅ Typed hook to consume the context safely
// eslint-disable-next-line react-refresh/only-export-components
export function useMultiStepForm<T>(): MultiStepFormContextType<T> {
  const context = useContext(InternalMultiStepFormContext);
  if (!context) {
    throw new Error("Must be used within <MultiStepFormProvider>");
  }
  return context as MultiStepFormContextType<T>;
}

// Props for the provider
type MultiStepFormProviderProps<T> = {
  children: ReactNode;
  totalSteps: number;
  initialSharedData: T;
};

// Generic Provider
export function MultiStepFormProvider<T>({
  children,
  totalSteps,
  initialSharedData,
}: MultiStepFormProviderProps<T>) {
const [currentStep, setCurrentStep] = useState(1);

  const [sharedData, setSharedData] = useState<T>(initialSharedData);
  const [stepsCount, setStepsCount] = useState(totalSteps);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= stepsCount) {
        setCurrentStep(step);
      }
    },
    [stepsCount],
  );

  const updateStepsCount = useCallback((steps: number) => {
    setStepsCount(steps);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < stepsCount ? prev + 1 : prev));
  }, [stepsCount]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const updateSharedData = useCallback(
    ({
      data,
      method = "merge",
    }: {
      data: Partial<T> | T;
      method?: "merge" | "replace";
    }) => {
      setSharedData((prev) =>
        method === "merge" ? ({ ...prev, ...data } as T) : (data as T),
      );
    },
    [],
  );

  const value: MultiStepFormContextType<T> = {
    currentStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === stepsCount,
    stepsCount,
    sharedData,
    goToStep,
    nextStep,
    prevStep,
    updateStepsCount,
    updateSharedData,
  };

  // ✅ Cast to unknown here to satisfy the non-generic context
  return (
    <InternalMultiStepFormContext.Provider
      value={value as MultiStepFormContextType<unknown>}
    >
      {children}
    </InternalMultiStepFormContext.Provider>
  );
}
