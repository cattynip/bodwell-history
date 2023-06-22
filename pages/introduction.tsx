import LeonSans from "@components/canvas/LeonSans";
import Palette from "@components/canvas/palette";

const Introduction = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LeonSans
        text={[
          "Bodwell High School was founded in 1991\nand is located in the waterfront of North Vancouver,\nCanada, overlooking the Vancouver Harbour and City Centre.\n It is a co-educational, university preparation boarding school,\n offering IB-MYP for grades 8 to 10 and BC curriculum for\n grades 10 to 12. Bodwell provides a culturally diverse environment\n for students from Canada and around the globe and enables them\n to become active learners and well-rounded citizens.\n Our students are continually guided by a counsellor from\n admission to post-secondary, following a personalized\n pathway plan for their unique needs and aspirations."
        ]}
      />
      <Palette theme="cmiscm" />
    </div>
  );
};

export default Introduction;
