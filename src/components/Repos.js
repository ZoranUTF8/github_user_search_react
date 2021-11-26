import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useContext(GithubContext);

  //* count total language use
  let languages = repos.reduce((total, item) => {
    const { language } = item;
    console.log(item);
    if (!language) {
      return total;
    } //? check if language property doesn't not exist
    else if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } //? if exists than add 1 to count
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }
    return total;
  }, {});
  //* change languages to array to get only the top 5 values
  languages = Object.values(languages)
    .sort((a, b) => { //* sort based on the top value
      return b.value - a.value;
    })
    .slice(0, 5); //* remove slice if want to display more than 5 languages



//* example data  chart
  // const chartData = [
  //   {
  //     label: "HTML",
  //     value: "29",
  //   },
  //   {
  //     label: "CSS",
  //     value: "26",
  //   },
  //   {
  //     label: "Javascript",
  //     value: "30",
  //   },
  //   {
  //     label: "Java",
  //     value: "28",
  //   },
  // ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData}/> */}
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
