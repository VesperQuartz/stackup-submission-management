import { SubmissionDialog } from "@/components/submission-dialog";
import { Submissions } from "@/components/submissions";

const Home = () => {
  return (
    <main className="">
      <div className="p-2 flex justify-between">
        <div></div>
        <div>
          <SubmissionDialog />
        </div>
      </div>
      <Submissions />
    </main>
  );
};

export default Home;
