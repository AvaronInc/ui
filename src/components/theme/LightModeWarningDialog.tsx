
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface LightModeWarningDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LightModeWarningDialog = ({ open, onConfirm, onCancel }: LightModeWarningDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Switch to Light Mode?</AlertDialogTitle>
          <AlertDialogDescription className="py-4">
            Avaron recommends Dark Mode for optimal clarity and reduced eye strain. But it's your world — go with what feels right.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Stay in Dark Mode
          </Button>
          <Button onClick={onConfirm}>
            Switch to Light Mode
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LightModeWarningDialog;
