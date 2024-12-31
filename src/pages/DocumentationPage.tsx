import React from 'react';

export default function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Calculator Documentation</h1>
      
      <div className="space-y-8">
        {/* Standard Calculator */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Standard Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Basic Operations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Addition (+): a + b</li>
                <li>Subtraction (-): a - b</li>
                <li>Multiplication (×): a × b</li>
                <li>Division (÷): a ÷ b</li>
                <li>Power (^): a^b</li>
                <li>Square Root (√): √a</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Memory Operations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>MC: Memory Clear</li>
                <li>MR: Memory Recall</li>
                <li>M+: Memory Add</li>
                <li>MS: Memory Store</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Programmer Calculator */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Programmer Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Bitwise Operations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>AND (&amp;): a &amp; b</li>
                <li>OR (|): a | b</li>
                <li>XOR (^): a ^ b</li>
                <li>Left Shift (&lt;&lt;): a &lt;&lt; b</li>
                <li>Right Shift (&gt;&gt;): a &gt;&gt; b</li>
                <li>Modulo (%): a % b</li>
                <li>Integer Division (\): a \ b</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Number Systems</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Binary (BIN): Base-2</li>
                <li>Octal (OCT): Base-8</li>
                <li>Decimal (DEC): Base-10</li>
                <li>Hexadecimal (HEX): Base-16</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Geometry */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Geometry</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">2D Shapes</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Circle: Area (πr²), Circumference (2πr)</li>
                <li>Rectangle: Area (w×h), Perimeter (2w + 2h)</li>
                <li>Triangle: Area (½bh), Perimeter (a + b + c)</li>
                <li>Trapezoid: Area (½(a+b)h)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">3D Shapes</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Cube: Volume (s³), Surface Area (6s²)</li>
                <li>Sphere: Volume (⁴⁄₃πr³), Surface Area (4πr²)</li>
                <li>Cylinder: Volume (πr²h), Surface Area (2πr² + 2πrh)</li>
                <li>Cone: Volume (⅓πr²h), Surface Area (πr² + πrs)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Network Tools */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Network Tools</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">IP Calculator</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>IPv4 Address Validation</li>
                <li>Subnet Calculation (CIDR)</li>
                <li>Network/Broadcast Address</li>
                <li>Available Hosts Range</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Bandwidth Calculator</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Transfer Time Calculation</li>
                <li>Data Unit Conversion</li>
                <li>Network Speed Analysis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Unit Conversions */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Available Conversions</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Length (m, km, ft, mi, in, yd)</li>
                <li>Area (m², km², ft², mi², acres)</li>
                <li>Volume (L, m³, gal, qt, ft³)</li>
                <li>Weight (kg, g, lb, oz, ton)</li>
                <li>Temperature (°C, °F, K)</li>
                <li>Speed (m/s, km/h, mph)</li>
                <li>Energy (J, cal, kWh, BTU)</li>
                <li>Pressure (Pa, bar, psi, atm)</li>
                <li>Power (W, kW, hp)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Testing */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">API Testing</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Request Components</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Protocol: HTTP, HTTPS, WS, WSS</li>
                <li>Method: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS</li>
                <li>Headers: Key-value pairs</li>
                <li>Query Parameters: URL parameters</li>
                <li>Request Body: JSON data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Response Analysis</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Status Code: HTTP response status</li>
                <li>Response Headers: Server response metadata</li>
                <li>Response Body: Returned data</li>
                <li>Timing: DNS, TCP, First Byte, Download</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}