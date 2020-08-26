const ClassVolunteersList = ({ bookings }) => {
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
          <tr>
            <td>{bookings[0].fullName}</td>
            <td>Coordinator</td>
            <td>@mdo</td>
            <td>
              <button>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassVolunteersList;
