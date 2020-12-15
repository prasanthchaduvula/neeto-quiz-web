import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { PageHeading } from "neetoui/layouts";
import {
  PageLoader,
  Button,
  Badge,
  Label,
  Toastr,
  Dropdown,
  Alert,
} from "neetoui";
import {
  deleteMocktest,
  getMocktest,
  publishMocktest,
  unpublishMocktest,
} from "apis/mocktests";
import PageNotFound from "../../../shared/PageNotFound";
import QuestionPane from "./Questions/Pane";
import MocktestPane from "./Pane";
import Questions from "./Questions";
import Students from "./Students";
import MocktestTemplate from "./Template";

function Mocktest({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [mocktest, setMocktest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState({});
  const [students, setStudents] = useState([]);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    fetchSingleMocktest();
  }, []);

  const fetchSingleMocktest = () => {
    getMocktest(match.params.id).then(response => {
      const {
        isCreator,
        isStudent,
        mocktest,
        questions,
        creator,
        students,
      } = response.data;
      setIsCreator(isCreator);
      setMocktest(mocktest);
      setQuestions(questions);
      setCreator(creator);
      setStudents(students);
      setIsStudent(isStudent);
      setLoading(false);
    });
  };

  if (loading) {
    return <PageLoader />;
  } else if (isCreator) {
    return (
      <MocktestDisplayForCreator
        mocktest={mocktest}
        fetchSingleMocktest={fetchSingleMocktest}
        questions={questions}
        creator={creator}
        students={students}
        history={history}
      />
    );
  } else if (isStudent) {
    return <MocktestTemplate mocktest={mocktest} questions={questions} />;
  } else {
    return <PageNotFound />;
  }
}

const MocktestDisplayForCreator = ({
  mocktest,
  fetchSingleMocktest,
  questions,
  creator,
  students,
  history,
}) => {
  const [mocktestPane, setMocktestPane] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [questionPane, setQuestionPane] = useState(false);
  const [showStudents, setShowStudents] = useState(false);

  const deleteSingleMocktest = () => {
    deleteMocktest(mocktest.id).then(() => {
      Toastr.success("Deleted successfully");
      history.push("/mocktests");
    });
  };

  const publishSingleMocktest = () => {
    publishMocktest(mocktest.id).then(response => {
      Toastr.success(response.data.notice);
      fetchSingleMocktest();
    });
  };

  const unpublishSingleMocktest = () => {
    unpublishMocktest(mocktest.id).then(response => {
      Toastr.success(response.data.notice);
      fetchSingleMocktest();
    });
  };

  return (
    <>
      <PageHeading
        title={mocktest.name}
        rightButton={() => (
          <>
            <Badge
              color={mocktest.is_published ? "green" : "yellow"}
              className="mr-4 text-base"
            >
              {mocktest.is_published
                ? "Published mocktest"
                : "Unpublished mocktest"}
            </Badge>

            <Button
              label="Add Question"
              icon="ri-add-line"
              className="mr-4"
              onClick={() => {
                setQuestionPane(true);
              }}
            />

            <Dropdown
              label="Settings"
              popoverClassName="pb-2"
              position="bottom-right"
              buttonStyle="primary"
              closeOnSelect
            >
              <li
                onClick={() =>
                  mocktest.is_published
                    ? setShowStudents(true)
                    : Toastr.error(
                        "You cannot add students without publishing mocktest"
                      )
                }
              >
                Students
              </li>
              <li onClick={() => setMocktestPane(true)}>Edit</li>
              <li
                className={`${mocktest.is_published && "text-red-600"}`}
                onClick={() =>
                  mocktest.is_published
                    ? unpublishSingleMocktest()
                    : publishSingleMocktest()
                }
              >
                {mocktest.is_published
                  ? "Unpublish Mocktest"
                  : "Publish Mocktest"}
              </li>
              <li
                className="text-red-600"
                onClick={() => {
                  mocktest.is_published
                    ? Toastr.error("You can not delete a published mocktest")
                    : setShowAlert(true);
                }}
              >
                Delete
              </li>
            </Dropdown>
          </>
        )}
      />
      <div className="flex items-center  w-full bg-gray-100 p-3 rounded-md">
        <Label className="text-base text-indigo-500 ">
          Price: &nbsp;
          <span className="font-bold">
            {mocktest.price ? `Rs ${mocktest.price}` : "Free"}
          </span>
        </Label>
        <Label className="text-base text-indigo-500 ml-4">
          Invitation code: &nbsp;
          <span className="font-bold ">{mocktest.invitation_code}</span>
        </Label>
      </div>
      <Questions
        questions={questions}
        mocktestId={mocktest.id}
        fetchSingleMocktest={fetchSingleMocktest}
      />
      <MocktestPane
        showPane={mocktestPane}
        setShowPane={setMocktestPane}
        isCreateForm={false}
        mocktest={mocktest}
        fetchMocktests=""
        creator={creator}
        fetchSingleMocktest={fetchSingleMocktest}
      />
      <Alert
        isOpen={showAlert}
        title="Delete Mocktest"
        message="You are permanently deleting the mocktest. This cannot be undone."
        confirmAction={deleteSingleMocktest}
        cancelAction={() => setShowAlert(false)}
      />
      <QuestionPane
        showPane={questionPane}
        setShowPane={setQuestionPane}
        isCreateForm={true}
        mocktestId={mocktest.id}
        fetchSingleMocktest={fetchSingleMocktest}
      />
      <Students
        showPane={showStudents}
        setShowPane={setShowStudents}
        students={students}
        mocktest={mocktest}
        fetchSingleMocktest={fetchSingleMocktest}
      />
    </>
  );
};

export default withRouter(Mocktest);
