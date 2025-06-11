
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Plus, AlertTriangle } from "lucide-react";

const screeningQuestions = [
  {
    id: "1",
    question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: "2",
    question: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: "3",
    question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
];

const previousScreenings = [
  {
    id: "1",
    date: "2024-05-15",
    type: "PHQ-9 Depression Screening",
    score: 8,
    riskLevel: "Mild",
    conductedBy: "Dr. Aisha Mohammed",
    notes: "Patient reports mild symptoms, recommend follow-up in 4 weeks",
  },
  {
    id: "2",
    date: "2024-02-10",
    type: "GAD-7 Anxiety Screening",
    score: 12,
    riskLevel: "Moderate",
    conductedBy: "Dr. Peter Nnamdi",
    notes: "Moderate anxiety symptoms, referred to counseling services",
  },
];

export const MentalHealthScreening = () => {
  const [showNewScreening, setShowNewScreening] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [additionalNotes, setAdditionalNotes] = useState("");

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Mild":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Moderate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const calculateScore = () => {
    return Object.values(responses).reduce((sum, value) => sum + parseInt(value || "0"), 0);
  };

  const getRiskLevel = (score: number) => {
    if (score <= 4) return "Low";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    return "High";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Mental Health Screening
          </h3>
        </div>
        <Button onClick={() => setShowNewScreening(!showNewScreening)}>
          <Plus className="h-4 w-4 mr-2" />
          New Screening
        </Button>
      </div>

      {showNewScreening && (
        <Card>
          <CardHeader>
            <CardTitle>Mental Health Assessment</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please answer the following questions based on how you've been feeling over the past 2 weeks.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {screeningQuestions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label className="text-base font-medium">{question.question}</Label>
                <RadioGroup
                  value={responses[question.id] || ""}
                  onValueChange={(value) => setResponses(prev => ({ ...prev, [question.id]: value }))}
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any additional observations or concerns..."
                rows={3}
              />
            </div>

            {Object.keys(responses).length === screeningQuestions.length && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Assessment Results</span>
                </div>
                <p className="text-blue-700 dark:text-blue-300">
                  Score: {calculateScore()} | Risk Level: 
                  <Badge className={`ml-2 ${getRiskColor(getRiskLevel(calculateScore()))}`}>
                    {getRiskLevel(calculateScore())}
                  </Badge>
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit">Submit Assessment</Button>
              <Button variant="outline" onClick={() => setShowNewScreening(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Screenings */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Screenings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {previousScreenings.map((screening) => (
              <div key={screening.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {screening.type}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {screening.date} • Conducted by {screening.conductedBy}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Score: {screening.score}
                    </p>
                    <Badge className={getRiskColor(screening.riskLevel)}>
                      {screening.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{screening.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
