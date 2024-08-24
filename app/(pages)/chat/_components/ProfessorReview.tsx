"use client";
import { useChat } from "@/app/contexts/chatContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { Spinner } from "./Spinner";
// Yup validation schema
const validationSchema = Yup.object({
  professorName: Yup.string().required("Professor name is required"),
  subject: Yup.string().required("Subject is required"),
  rating: Yup.number().min(0).max(5).required("Rating is required"),
  professorReview: Yup.string().required("Professor review is required"),
});

const ProfessorReview: React.FC = () => {
  const [url, setUrl] = React.useState<string>("");
  const { setMessages, setChatIsBusy, chatIsBusy } = useChat();
  const [rateMyProfessorLoading, setRateMyProfessorLoading] =
    React.useState<boolean>(false);
  const [rateMyProfessorError, setRateMyProfessorError] = React.useState<
    string | null
  >(null);
  const [ratingError, setRatingError] = React.useState<string | null>(null);

  const submitRateMyProfessor = (url: string) => {
    if (chatIsBusy) return;

    setChatIsBusy(true);
    setRateMyProfessorLoading(true);
    fetch("/api/submit-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error submitting Rate My Professor URL:", data.error);
          setRateMyProfessorError("An error occurred");
          return;
        }

        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: `Professor ${data.professorName} added successfully`,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error submitting Rate My Professor URL:", error);
      })
      .finally(() => {
        setRateMyProfessorLoading(false);
      });
  };

  const initialValues = {
    professorName: "",
    subject: "",
    rating: null,
    professorReview: "",
    url: "",
  };

  const searchForProfessors = () => {
    if (chatIsBusy) return;

    setChatIsBusy(true);
    console.log("Searching for professors");
    setChatIsBusy(false);
  };
  const onSubmit = (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (chatIsBusy) return;

    setRatingError(null);
    setChatIsBusy(true);
    console.log("Form submitted with values:", values);

    fetch("/api/submit-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professorName: values.professorName,
        subject: values.subject,
        stars: values.rating,
        review: values.professorReview,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("res from submit-rating", data);

        if (data.error) {
          setRatingError(data.error);
          return;
        }

        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: `Professor ${data.professorName} rated successfully ✅
        `,
          },
        ]);
      })
      .finally(() => {
        setChatIsBusy(false);
        setSubmitting(false);
      });
  };

  return (
    <section className="chat-filter flex flex-col gap-4">
      <div className="flex flex-col gap-1 p-4 bg-gray-700 bg-opacity-30 rounded-lg max-w-[596px] max-md:px-5">
        <h2 className="gap-2.5 self-start text-xl tracking-normal leading-loose text-white">
          Filter
        </h2>
        <div
          className={`flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] max-w-[558px] px-[16px] py-[8px]
        ${rateMyProfessorLoading ? "opacity-50" : "opacity-100"}
        `}
        >
          <input
            type="text"
            placeholder="Submit Your Rate My Professor URL"
            className="flex-grow px-4 py-2 text-black text-[16px] bg-transparent outline-none placeholder-white"
            onChange={(e) => setUrl(e.target.value)}
            disabled={rateMyProfessorLoading}
          />
          <button
            className="p-2 bg-gray-700 rounded-full"
            onClick={() => submitRateMyProfessor(url)}
            disabled={rateMyProfessorLoading}
          >
            {rateMyProfessorLoading ? (
              <Spinner />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
        {rateMyProfessorError && (
          <div className="text-red-500">{rateMyProfessorError}</div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4 bg-gray-700 bg-opacity-30 rounded-lg max-w-[596px] max-md:px-5">
        <h2 className="gap-2.5 self-start text-xl tracking-normal leading-loose text-white">
          Search for Professors
        </h2>
        <div>
          <div className="items-center w-full rounded-2xl border border-black border-solid max-md:max-w-full">
            <input
              type="text"
              placeholder="Enter Professor Name"
              className="overflow-hidden text-[15px] grow shrink self-stretch px-4 py-2.5 my-auto text-base leading-tight w-full text-black bg-[#ADA8C4] rounded-lg w-[200px] max-md:px-5 placeholder-white"
            />
          </div>
          {/* <div className="flex flex-wrap gap-10 items-centerw-full mt-4 rounded-2xl border border-black border-solid max-md:max-w-full">
            <Field
              type="text"
              placeholder="Enter Subject"
              className="overflow-hidden text-[16px] grow shrink self-stretch px-4 py-2.5 my-auto text-base leading-tight text-black bg-[#ADA8C4] rounded-lg w-[200px] max-md:px-5 placeholder-white"
            />
          </div>
          <div className="flex flex-wrap gap-10 items-center w-full mt-4 rounded-2xl border border-black border-solid max-md:max-w-full">
            <label
              htmlFor="rating"
              className="gap-2.5 self-stretch p-2.5 my-auto text-xl tracking-normal leading-loose text-white"
            >
              Rating (0-5)
            </label>
            <Field
              as="select"
              className="overflow-hidden text-[16px] grow shrink self-stretch px-4 py-2.5 my-auto mr-3 text-base leading-tight text-black bg-[#ADA8C4] rounded-lg w-[100px] max-md:px-5 placeholder-white"
            >
              <option value="">Select</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Field>
          </div>
          <div className="mt-8">
            <Field
              as="textarea"
              placeholder="Write your review for this professor"
              className="overflow-y-auto text-[24px] px-6 pt-5 pb-10 text-base leading-tight text-black bg-gray-400 rounded-2xl max-md:px-5 max-md:max-w-full w-full placeholder-white"
            />
          </div> */}
          <button
            type="submit"
            className={`overflow-hidden self-center px-16 py-3.5 mt-8 max-w-full text-2l font-semibold leading-tight text-white whitespace-nowrap rounded-2xl w-full max-md:px-5 flex justify-center items-center gap-2`}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex overflow-hidden flex-col px-4 pt-[2rem] pb-5 rounded-lg bg-gray-700 bg-opacity-30 max-w-[596px] max-md:px-5">
        <h2 className="gap-2.5 self-start text-xl tracking-normal leading-loose text-white">
          Add Professor Rating
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="items-center w-full rounded-2xl border border-black border-solid max-md:max-w-full">
                <Field
                  type="text"
                  id="professor-name"
                  name="professorName"
                  placeholder="Enter Professor Name"
                  className="overflow-hidden text-[15px] grow shrink self-stretch px-4 py-2.5 my-auto text-base leading-tight w-full text-black bg-[#ADA8C4] rounded-lg w-[200px] max-md:px-5 placeholder-white"
                />
              </div>
              <ErrorMessage
                name="professorName"
                component="div"
                className="text-red-500"
              />

              <div className="flex flex-wrap gap-10 items-centerw-full mt-4 rounded-2xl border border-black border-solid max-md:max-w-full">
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter Subject"
                  className="overflow-hidden text-[16px] grow shrink self-stretch px-4 py-2.5 my-auto text-base leading-tight text-black bg-[#ADA8C4] rounded-lg w-[200px] max-md:px-5 placeholder-white"
                />
              </div>
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500"
              />

              <div className="flex flex-wrap gap-10 items-center w-full mt-4 rounded-2xl border border-black border-solid max-md:max-w-full">
                <label
                  htmlFor="rating"
                  className="gap-2.5 self-stretch p-2.5 my-auto text-xl tracking-normal leading-loose text-white"
                >
                  Rating (0-5)
                </label>
                <Field
                  as="select"
                  id="rating"
                  name="rating"
                  className="overflow-hidden text-[16px] grow shrink self-stretch px-4 py-2.5 my-auto mr-3 text-base leading-tight text-black bg-[#ADA8C4] rounded-lg w-[100px] max-md:px-5 placeholder-white"
                >
                  <option value="">Select</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Field>
              </div>
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500"
              />

              <div className="mt-8">
                <Field
                  as="textarea"
                  id="professor-review"
                  name="professorReview"
                  placeholder="Write your review for this professor"
                  className="overflow-y-auto text-[24px] px-6 pt-5 pb-10 text-base leading-tight text-black bg-gray-400 rounded-2xl max-md:px-5 max-md:max-w-full w-full placeholder-white"
                />
              </div>
              <ErrorMessage
                name="professorReview"
                component="div"
                className="text-red-500"
              />
              {ratingError && (
                <div className="text-red-500">There has been an error</div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`overflow-hidden self-center px-16 py-3.5 mt-8 max-w-full text-2l font-semibold leading-tight text-white whitespace-nowrap rounded-2xl w-full max-md:px-5 flex justify-center items-center gap-2 ${
                  isSubmitting ? "bg-red-800" : "bg-red-400"
                }`}
              >
                {isSubmitting ? <Spinner /> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ProfessorReview;
