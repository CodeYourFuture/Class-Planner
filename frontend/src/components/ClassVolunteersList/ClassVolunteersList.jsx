const ClassVolunteersList = ({ bookings }) => {
  console.log(bookings);
  return (
    <div className="classvolunteerslist-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((volunteer) => (
            <tr>
              <td>{volunteer.fullName}</td>
              <td>{volunteer.role}</td>
              <td>{volunteer.email}</td>
              <td>
                <button className="btn-cancel-volunteer">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassVolunteersList;
