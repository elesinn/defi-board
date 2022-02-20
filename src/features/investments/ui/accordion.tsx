const InvestmentsAccordion = () => {
  return (
    <div className="accordion" id="accordionExample5">
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingOne5">
          <button
            className="
              accordion-button
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne5"
            aria-expanded="true"
            aria-controls="collapseOne5"
          >
            Planty
          </button>
        </h2>
        <div
          id="collapseOne5"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne5"
        >
          <div className="accordion-body py-4 px-5">data</div>
        </div>
      </div>
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingTwo5">
          <button
            className="
              accordion-button
              collapsed
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo5"
            aria-expanded="false"
            aria-controls="collapseTwo5"
          >
            QuipuSwap
          </button>
        </h2>
        <div
          id="collapseTwo5"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo5"
        >
          <div className="accordion-body py-4 px-5">data</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsAccordion;
