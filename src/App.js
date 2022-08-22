import React from "react";
import moment from "moment";
import "moment/locale/pl";

import "./styles.css";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.datapickerContainer = React.createRef();
  }

  componentDidMount() {
    window.$(this.datapickerContainer.current).datepicker({
      onSelect: this.props.onDateChange,
      defaultDate: this.props.initialDate
    });
  }

  componentWillUnmount() {
    window.$(this.datapickerContainer.current).datepicker("destroy");
  }

  render() {
    return <div ref={this.datapickerContainer} />;
  }
}

function DateDetails({ date, format }) {
  const theDate = moment(date, format);
  const now = moment().hour(0).minute(0).seconds(0);

  const nextValentines = moment([theDate.year(), 1, 14]);
  if (theDate.isSameOrAfter(nextValentines)) {
    nextValentines.add(1, "year");
  }

  const summerStart = theDate
    .clone()
    .startOf("year")
    .add(5, "months")
    .add(20, "days");

  const summerEnd = moment(summerStart).month(8).date(23);
  const programersDay = moment(theDate).startOf("year").dayOfYear(256);

  return (
    <div className="DateDetails">
      <ol>
        <li>This date is: {theDate.format("llll")}</li>
        <li>
          Counting from now ({now.format("LLLL")}), {theDate.from(now)}
        </li>
        <li>
          Next valentine's day ({nextValentines.format()}),{" "}
          {theDate.to(nextValentines)}
        </li>
        <li>
          It {theDate.isLeapYear() ? "falls" : "does not fall"} within a leap
          year.
        </li>
        <li>
          It {theDate.isBetween(summerStart, summerEnd) ? "is" : "is not"} a
          summer day (it's between {summerStart.format("ll")} and{" "}
          {summerEnd.format("ll")}).
        </li>
        <li>
          It {theDate.isSame(programersDay, "date") ? "is" : "is not"}{" "}
          Programmer's Day ({programersDay.format("ll")}).
        </li>
      </ol>
    </div>
  );
}

class App extends React.Component {
  state = {
    selectedDate: "08/23/2022"
  };
  render() {
    return (
      <div className="App">
        <h1>Hello jQuery</h1>
        <h2>
          {this.state.selectedDate ? this.state.selectedDate : "Wybierz datę"}
        </h2>
        <DatePicker
          initialDate={this.state.selectedDate}
          onDateChange={(date) => this.setState({ selectedDate: date })}
        />
        {this.state.selectedDate ? (
          <DateDetails date={this.state.selectedDate} format="MM/DD/YYYY" />
        ) : null}
      </div>
    );
  }
}
export default App;
