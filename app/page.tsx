"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Home,
  FileText,
  Search,
  Settings,
  Play,
  Download,
  RotateCcw,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"

type WorkflowStep = "configure" | "schema" | "validate" | "extract" | "complete"

export default function FinancialExtractionTool() {
  const [tickerSymbol, setTickerSymbol] = useState("GIGANTE")
  const [quarter, setQuarter] = useState("1")
  const [year, setYear] = useState("2025")
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("configure")
  const [extractResults, setExtractResults] = useState(null)
  const [schemaResults, setSchemaResults] = useState(null)
  const [validationResults, setValidationResults] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const [showSidebar, setShowSidebar] = useState(true)
  const [showConfiguration, setShowConfiguration] = useState(true)
  const [showResults, setShowResults] = useState(true)
  const [showPreview, setShowPreview] = useState(true)

  const mockSchemaData = {
    detected_fields: [
      "company_name",
      "statement_type",
      "reporting_period",
      "ticker_symbol",
      "efectivo_y_equivalentes",
      "clientes_cuentas_cobrar",
      "impuestos_recuperar",
      "otros_activos_financieros",
      "inventarios",
    ],
    confidence_score: 0.94,
    document_type: "Estado de situación financiera",
  }

  const mockValidationData = {
    status: "valid",
    checks_passed: 8,
    total_checks: 9,
    warnings: ["Missing prior period data for 'Inventarios'"],
    errors: [],
  }

  const mockExtractedData = {
    run_id: "7c347d72-f68f-4ee8-8b8b-abc4d3ae5c8e",
    extraction_agent_id: "1c72a8a4-52fc-4f94-a94e-482cc6ee4d2",
    data: {
      company_name: "GIGANTE",
      statement_type: "Estado de situación financiera",
      reporting_period: "2025Q1",
      ticker_symbol: "GIGANTE",
      financial_data: [
        {
          concept: "Efectivo y equivalentes de efectivo",
          current_period: 341756400,
          prior_period: 110446800,
        },
        {
          concept: "Clientes y otras cuentas por cobrar",
          current_period: 172476200,
          prior_period: 178582400,
        },
        {
          concept: "Impuestos por recuperar",
          current_period: 186400800,
          prior_period: null,
        },
        {
          concept: "Otros activos financieros",
          current_period: 118012800,
          prior_period: 148118400,
        },
        {
          concept: "Inventarios",
          current_period: 631957000,
          prior_period: null,
        },
      ],
    },
  }

  const handleSchemaExtraction = async () => {
    setIsProcessing(true)
    setProgress(0)
    setCurrentStep("schema")

    // Simulate schema extraction progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSchemaResults(mockSchemaData)
          setCurrentStep("validate")
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleValidation = async () => {
    setIsProcessing(true)
    setProgress(0)

    // Simulate validation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setValidationResults(mockValidationData)
          setCurrentStep("extract")
          setIsProcessing(false)
          return 100
        }
        return prev + 15
      })
    }, 150)
  }

  const handleRunExtraction = async () => {
    setIsProcessing(true)
    setProgress(0)

    // Simulate extraction progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setExtractResults(mockExtractedData)
          setCurrentStep("complete")
          setIsProcessing(false)
          setTimeout(() => setShowConfiguration(false), 1000)
          return 100
        }
        return prev + 8
      })
    }, 180)
  }

  const getStepStatus = (step: WorkflowStep) => {
    const stepOrder = ["configure", "schema", "validate", "extract", "complete"]
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(step)

    if (stepIndex < currentIndex) return "complete"
    if (stepIndex === currentIndex) return "active"
    return "pending"
  }

  const getStepIcon = (step: WorkflowStep) => {
    const status = getStepStatus(step)
    if (status === "complete") return <CheckCircle className="w-4 h-4 text-purple-500" />
    if (status === "active" && isProcessing) return <Clock className="w-4 h-4 text-gray-500 animate-pulse" />
    if (status === "active") return <div className="w-4 h-4 rounded-full bg-purple-500" />
    return <div className="w-4 h-4 rounded-full border border-gray-300" />
  }

  return (
    <div className="flex h-screen bg-white">
      {showSidebar ? (
        <div className="w-64 bg-white border-r border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 text-base">BRAVA</span>
                  <span className="text-xs text-gray-500 block -mt-1">Financial AI</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            </div>

            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 font-normal"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 font-normal"
              >
                <FileText className="w-4 h-4" />
                Documents
              </Button>
              <Button className="w-full justify-start gap-3 bg-purple-50 text-purple-700 hover:bg-purple-100 h-10 shadow-none font-normal">
                <Search className="w-4 h-4" />
                Extract
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 font-normal"
              >
                <FileText className="w-4 h-4" />
                Analytics
              </Button>
            </nav>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <Separator className="mb-6 bg-gray-100" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 font-normal"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-12 bg-white border-r border-gray-100 flex flex-col items-center py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(true)}
            className="text-gray-400 hover:text-gray-600 p-2 mb-8"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </Button>
          <div className="space-y-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-2">
              <Home className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-2">
              <FileText className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-purple-50 text-purple-700 hover:bg-purple-100 p-2 shadow-none">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-2">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {showConfiguration ? (
          <div className="w-96 border-r border-gray-100 bg-white">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-medium text-gray-900">AI Agent Configuration</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal border-0">
                    Financial Extractor
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfiguration(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* ... existing workflow steps ... */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  {getStepIcon("configure")}
                  <span
                    className={`text-sm ${getStepStatus("configure") === "active" ? "text-gray-900 font-medium" : getStepStatus("configure") === "complete" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    Configure Parameters
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {getStepIcon("schema")}
                  <span
                    className={`text-sm ${getStepStatus("schema") === "active" ? "text-gray-900 font-medium" : getStepStatus("schema") === "complete" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    AI Schema Detection
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {getStepIcon("validate")}
                  <span
                    className={`text-sm ${getStepStatus("validate") === "active" ? "text-gray-900 font-medium" : getStepStatus("validate") === "complete" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    Smart Validation
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {getStepIcon("extract")}
                  <span
                    className={`text-sm ${getStepStatus("extract") === "active" ? "text-gray-900 font-medium" : getStepStatus("extract") === "complete" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    BRAVA Extraction
                  </span>
                </div>
              </div>

              {isProcessing && (
                <div className="mb-8">
                  <Progress value={progress} className="h-1 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-3">BRAVA AI processing... {progress}%</p>
                </div>
              )}
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8 space-y-8">
                {/* ... existing configuration form ... */}
                <div>
                  <Label htmlFor="ticker" className="text-sm font-medium text-gray-700 mb-3 block">
                    Company Ticker
                  </Label>
                  <Select value={tickerSymbol} onValueChange={setTickerSymbol}>
                    <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GIGANTE">GIGANTE</SelectItem>
                      <SelectItem value="WALMART">WALMART</SelectItem>
                      <SelectItem value="SORIANA">SORIANA</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">Stock ticker symbol for financial extraction</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Reporting Period</Label>
                  <div className="space-y-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <Label htmlFor="quarter" className="text-sm text-gray-600 mb-2 block">
                        Quarter
                      </Label>
                      <Select value={quarter} onValueChange={setQuarter}>
                        <SelectTrigger className="bg-white border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Q1</SelectItem>
                          <SelectItem value="2">Q2</SelectItem>
                          <SelectItem value="3">Q3</SelectItem>
                          <SelectItem value="4">Q4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="year" className="text-sm text-gray-600 mb-2 block">
                        Year
                      </Label>
                      <Input
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2025"
                        className="bg-white border-gray-200"
                      />
                    </div>
                  </div>
                </div>

                {schemaResults && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">BRAVA AI Schema Detected</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Identified {schemaResults.detected_fields.length} financial fields with{" "}
                      {Math.round(schemaResults.confidence_score * 100)}% confidence
                    </p>
                  </div>
                )}

                {validationResults && (
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Smart Validation Complete</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        {validationResults.checks_passed}/{validationResults.total_checks} quality checks passed
                      </p>
                    </div>

                    {validationResults.warnings.length > 0 && (
                      <Alert className="border-gray-200 bg-gray-50">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        <AlertDescription className="text-gray-700 text-sm">
                          {validationResults.warnings[0]}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-8 border-t border-gray-100">
              {/* ... existing action buttons ... */}
              {currentStep === "configure" && (
                <Button
                  onClick={handleSchemaExtraction}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-normal h-10"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start AI Detection
                </Button>
              )}

              {currentStep === "validate" && (
                <Button
                  onClick={handleValidation}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-normal h-10"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validate with BRAVA
                </Button>
              )}

              {currentStep === "extract" && (
                <Button
                  onClick={handleRunExtraction}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-normal h-10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run BRAVA Extraction
                </Button>
              )}

              {currentStep === "complete" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-purple-600 font-medium text-sm">
                    <CheckCircle className="w-4 h-4" />
                    BRAVA Extraction Complete
                  </div>
                  <Button
                    onClick={() => {
                      setCurrentStep("configure")
                      setSchemaResults(null)
                      setValidationResults(null)
                      setExtractResults(null)
                      setProgress(0)
                      setShowConfiguration(true)
                    }}
                    variant="outline"
                    className="w-full border-gray-200 font-normal h-10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Extraction
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-12 bg-white border-r border-gray-100 flex flex-col items-center py-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfiguration(true)}
              className="text-gray-400 hover:text-gray-600 p-2 mb-4"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="text-xs text-gray-400 writing-mode-vertical-rl text-orientation-mixed">Config</div>
          </div>
        )}

        {showResults ? (
          <div className="flex-1 flex flex-col bg-white">
            <div className="border-b border-gray-100 p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-medium text-gray-900">BRAVA Extraction Results</h3>
                {extractResults && <Badge className="bg-purple-50 text-purple-700 border-0 font-normal">Success</Badge>}
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-gray-200 font-normal bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
                <span className="text-sm text-gray-500">INFORMACION-TRIMESTRAL-1T2025_ESPANOL.pdf</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResults(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-8">
              {extractResults ? (
                <ScrollArea className="h-full">
                  <pre className="text-sm bg-gray-50 text-gray-800 p-6 rounded-lg overflow-auto font-mono leading-relaxed border border-gray-200">
                    {JSON.stringify(extractResults, null, 2)}
                  </pre>
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Ready for BRAVA AI Extraction</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Configure your extraction parameters and let BRAVA's AI intelligently extract financial data from
                      your documents.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-12 bg-white border-r border-gray-100 flex flex-col items-center py-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResults(true)}
              className="text-gray-400 hover:text-gray-600 p-2 mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-xs text-gray-400 writing-mode-vertical-rl text-orientation-mixed">Results</div>
          </div>
        )}

        {showPreview ? (
          <div className="w-80 border-l border-gray-100 bg-white">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Document Preview</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <PanelRightClose className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="aspect-[3/4] bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="font-medium mb-1 text-sm">PDF Preview</p>
                  <p className="text-xs">Upload a financial document</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-dashed border-gray-300 hover:border-purple-300 hover:bg-purple-50 h-10 font-normal bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-12 bg-white border-l border-gray-100 flex flex-col items-center py-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="text-gray-400 hover:text-gray-600 p-2 mb-4"
            >
              <PanelRightOpen className="w-4 h-4" />
            </Button>
            <div className="text-xs text-gray-400 writing-mode-vertical-rl text-orientation-mixed">Preview</div>
          </div>
        )}
      </div>
    </div>
  )
}
