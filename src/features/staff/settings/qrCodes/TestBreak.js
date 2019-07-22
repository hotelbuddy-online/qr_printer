import React, { Component } from 'react';

export default class TestBreak extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div className="staff-settings-qr-codes-test-break">
                <table>
                    <tr>
                        <td>A1</td>
                        <td>A2</td>
                        <td>A3</td>
                        <td>A4</td>
                        <td>A5</td>
                        <td>A6</td>
                        <td>A7</td>
                    </tr>

                    <tr>
                        <td>B1</td>
                        <td>B2</td>
                        <td>B3</td>
                        <td>B4</td>
                        <td>B5</td>
                        <td>B6</td>
                        <td>B7</td>
                    </tr>

                    <tr>
                        <td>C1</td>
                        <td>C2</td>
                        <td>C3</td>
                        <td>C4</td>
                        <td>C5</td>
                        <td>C6</td>
                        <td>C7</td>
                    </tr>

                    <tr>
                        <td>D1</td>
                        <td>D2</td>
                        <td>D3</td>
                        <td>D4</td>
                        <td>D5</td>
                        <td>D6</td>
                        <td>D7</td>
                    </tr>

                    <tr>
                        <td>E1</td>
                        <td>E2</td>
                        <td>E3</td>
                        <td>E4</td>
                        <td>E5</td>
                        <td>E6</td>
                        <td>E7</td>
                    </tr>

                    <tr>
                        <td>F1</td>
                        <td>F2</td>
                        <td>F3</td>
                        <td>F4</td>
                        <td>F5</td>
                        <td>F6</td>
                        <td>F7</td>
                    </tr>

                    <tr class="page-break">
                        <td colspan="7" />
                    </tr>

                    <tr>
                        <td>G1</td>
                        <td>G2</td>
                        <td>G3</td>
                        <td>G4</td>
                        <td>G5</td>
                        <td>G6</td>
                        <td>G7</td>
                    </tr>
                </table>

            </div>
        );
    }
}
