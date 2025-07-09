import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  Activity, 
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  FileDown,
  Eye,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  id: string;
  title: string;
  type: 'patient' | 'staff' | 'appointment' | 'financial' | 'medical';
  generatedBy: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  format: 'pdf' | 'csv' | 'xlsx';
  description: string;
  recordCount: number;
}

const sampleReports: ReportData[] = [
  {
    id: "RPT001",
    title: "Monthly Patient Summary",
    type: "patient",
    generatedBy: "Dr. Fatima Aliyu",
    createdAt: "2024-01-15",
    status: "completed",
    format: "pdf",
    description: "Comprehensive patient statistics and demographics for January 2024",
    recordCount: 1250
  },
  {
    id: "RPT002", 
    title: "Staff Health Status Report",
    type: "staff",
    generatedBy: "Nurse Grace Danladi",
    createdAt: "2024-01-14",
    status: "completed",
    format: "xlsx",
    description: "Staff vaccination status and health checkup compliance",
    recordCount: 45
  },
  {
    id: "RPT003",
    title: "Appointment Analytics",
    type: "appointment", 
    generatedBy: "System Admin",
    createdAt: "2024-01-13",
    status: "pending",
    format: "csv",
    description: "Appointment booking patterns and no-show analysis",
    recordCount: 890
  }
];

const reportTemplates = [
  {
    id: "TMPL001",
    name: "Patient Demographics Report",
    description: "Age groups, gender distribution, and geographic data",
    type: "patient" as const
  },
  {
    id: "TMPL002", 
    name: "Medical Conditions Summary",
    description: "Most common diagnoses and treatment outcomes",
    type: "medical" as const
  },
  {
    id: "TMPL003",
    name: "Staff Performance Metrics",
    description: "Workload, patient satisfaction, and efficiency metrics",
    type: "staff" as const
  },
  {
    id: "TMPL004",
    name: "Financial Analysis",
    description: "Revenue, expenses, and cost per patient analysis",
    type: "financial" as const
  }
];

export const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "failed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "patient":
        return <Users className="h-4 w-4" />;
      case "staff":
        return <Activity className="h-4 w-4" />;
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "financial":
        return <TrendingUp className="h-4 w-4" />;
      case "medical":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "csv":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-blue-500" />;
      default:
        return <FileDown className="h-4 w-4" />;
    }
  };

  const handleGenerateReport = async (templateId: string) => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report Generated Successfully",
        description: "Your report has been generated and is ready for download.",
      });
      
      setIsNewReportOpen(false);
    } catch (error) {
      toast({
        title: "Report Generation Failed", 
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download Started",
      description: "Your report download has begun.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground">Generate and manage healthcare reports</p>
          </div>
        </div>
        
        <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-from">From Date</Label>
                  <Input id="date-from" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-to">To Date</Label>
                  <Input id="date-to" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="format">Export Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Report Templates</Label>
                <div className="grid grid-cols-1 gap-3">
                  {reportTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => handleGenerateReport(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(template.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <Button size="sm" disabled={isGenerating}>
                            {isGenerating ? "Generating..." : "Generate"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input placeholder="Search reports..." className="max-w-sm" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {sampleReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Generated by {report.generatedBy}</span>
                          <span>•</span>
                          <span>{report.createdAt}</span>
                          <span>•</span>
                          <span>{report.recordCount} records</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getFormatIcon(report.format)}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownloadReport(report.id)}
                        disabled={report.status !== 'completed'}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedReport(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(template.type)}
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <Button 
                    onClick={() => setIsNewReportOpen(true)}
                    className="w-full"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold text-foreground">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Download className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                    <p className="text-2xl font-bold text-foreground">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold text-foreground">45</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};