import { getSavedArtAction } from "../actions";
import SavedArtGallery from "@/components/SavedArtGallery";

export default async function SavedArtPage() {
  const arts = await getSavedArtAction();
  return <SavedArtGallery arts={arts} />;
}
