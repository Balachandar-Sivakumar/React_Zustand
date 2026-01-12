import { createClient } from "@supabase/supabase-js";
import showMessage from "./notification";


const supaBaseUrl = "https://oawnzzbzqfemkuqgehso.supabase.co";
const supaBaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hd256emJ6cWZlbWt1cWdlaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDIxNDcsImV4cCI6MjA4MjkxODE0N30.DxJ5fDal8Pxl5z4-1YGrnNR9izZ51hMZHvY_a5q0JDg";

const supaBase = createClient(supaBaseUrl, supaBaseKey);

async function uploadSupabase(file) {
  if (!file) return;

  const filePath = `${Date.now()}-${file.name}`;

  // Upload file
  const { error: uploadError } = await supaBase.storage
    .from("images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    showMessage("error", uploadError.message);
    return;
  }

  // Get public URL
  const { data: publicData, error: publicError } = supaBase.storage
    .from("images")
    .getPublicUrl(filePath);

  if (publicError) {
    console.error("Public URL error:", publicError);
    showMessage("error", publicError.message);
    return;
  }

  return publicData.publicUrl; // this is the public URL of the uploaded image
}

export default uploadSupabase;
