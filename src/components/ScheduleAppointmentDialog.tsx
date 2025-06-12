
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

interface ScheduleAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
}

export const ScheduleAppointmentDialog = ({ open, onOpenChange, patientName }: ScheduleAppointmentDialogProps) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctor: "",
    type: "",
    reason: "",
    notes: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Scheduled",
      description: `Appointment scheduled for ${patientName} on ${formData.date} at ${formData.time}`,
    });
    onOpenChange(false);
    setFormData({
      date: "",
      time: "",
      doctor: "",
      type: "",
      reason: "",
      notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Schedule Appointment - {patientName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="doctor">Doctor</Label>
            <Select value={formData.doctor} onValueChange={(value) => setFormData({...formData, doctor: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-fatima">Dr. Fatima Aliyu</SelectItem>
                <SelectItem value="dr-john">Dr. John Okafor</SelectItem>
                <SelectItem value="dr-aisha">Dr. Aisha Mohammed</SelectItem>
                <SelectItem value="dr-grace">Dr. Grace Musa</SelectItem>
                <SelectItem value="dr-samuel">Dr. Samuel Dung</SelectItem>
                <SelectItem value="dr-hauwa">Dr. Hauwa Ibrahim</SelectItem>
                <SelectItem value="dr-peter">Dr. Peter Bulus</SelectItem>
                <SelectItem value="dr-mary">Dr. Mary Gyang</SelectItem>
                <SelectItem value="dr-emmanuel">Dr. Emmanuel Yakubu</SelectItem>
                <SelectItem value="dr-ruth">Dr. Ruth Laven</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">General Consultation</SelectItem>
                <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                <SelectItem value="check-up">Health Check-up</SelectItem>
                <SelectItem value="counseling">Counseling Session</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Visit</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Brief description of the reason"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional information"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
