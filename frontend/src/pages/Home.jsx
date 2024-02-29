import React from "react";
import AdminSidebar from "../components/adminSidebar";
import HomeImage from "../images/HomeImage.png";
function Home() {
  return (
    <div className="container-fluid bg-light">
      <div>
        <br />
      </div>
      <div
        className="row clearfix even-row wow slideInUp animated"
        data-wow-delay="500ms"
        style={{
          visibility: "visible",
          animationDelay: 500,
          animatioName: "slideInUp",
        }}
      >
        <img
          class=" lazyloaded feature-block-three col-md-6 col-sm-12 fbt1"
          height={600}
          alt="inventory management"
          src={HomeImage}
        />

        <div class="feature-block-three col-md-6 col-sm-12 fbt1">
          <div
            class="text-center prd-title tab"
            data-wow-delay="0ms"
            data-wow-duration="2500ms"
          >
            <div>
              <br />
            </div>
            <h2 className="fs-1 ">
              <b>Store Inventory Manager</b>
            </h2>
            <p className="col-md-12">
              Our user-friendly website strives to revolutionize inventory
              management for businesses, ensuring real-time tracking, error
              reduction, and optimal stock levels. Robust security measures,
              such as user access control and detailed audit trails, safeguard
              sensitive data. The project's core objective is to simplify
              inventory complexities, minimize manual errors, and enhance
              decision-making. By providing a more accurate, productive, and
              organized approach to inventory management, the website aims to
              significantly improve the operational efficiency of businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
