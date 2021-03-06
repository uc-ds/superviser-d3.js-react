import React from "react";
import { Row, Image } from "antd";
import './memberBasicInfo.scss';
import Tag from "../../../../../shared/Frx-components/tags/Tag";

const HumanIcon = () => (
    <svg width="11" height="27" viewBox="0 0 11 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 6C7.15685 6 8.5 4.65685 8.5 3C8.5 1.34315 7.15685 0 5.5 0C3.84315 0 2.5 1.34315 2.5 3C2.5 4.65685 3.84315 6 5.5 6ZM5.5 5C6.60457 5 7.5 4.10457 7.5 3C7.5 1.89543 6.60457 1 5.5 1C4.39543 1 3.5 1.89543 3.5 3C3.5 4.10457 4.39543 5 5.5 5ZM0 8C0 7.44772 0.447715 7 1 7H10C10.5523 7 11 7.44772 11 8V16.5C11 16.7761 10.7761 17 10.5 17C10.2239 17 10 16.7761 10 16.5V8.5C10 8.22386 9.77614 8 9.5 8H1.5C1.22386 8 1 8.22386 1 8.5V16.5C1 16.7761 0.776142 17 0.5 17C0.223858 17 0 16.7761 0 16.5V8ZM2 10.5C2 10.2239 2.22386 10 2.5 10C2.77614 10 3 10.2239 3 10.5V25C3 25.5523 3.44772 26 4 26C4.55228 26 5 25.5523 5 25V18.5C5 18.2239 5.22386 18 5.5 18C5.77614 18 6 18.2239 6 18.5V25C6 25.5523 6.44772 26 7 26C7.55228 26 8 25.5523 8 25V10.5C8 10.2239 8.22386 10 8.5 10C8.77614 10 9 10.2239 9 10.5V25C9 26.1046 8.10457 27 7 27C6.40265 27 5.86647 26.7381 5.5 26.3229C5.13353 26.7381 4.59735 27 4 27C2.89543 27 2 26.1046 2 25V10.5Z" fill="#4FA2EF" />
    </svg>
)

class MemberBasicInfo extends React.Component<any, any> {

    render() {
        return (
            <div className="basic-info-area">
                <Row>
                    <Image
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <HumanIcon />
                    <span className="name">Marie Doe</span>
                </Row>

                <Row>
                    <Tag tagValue="Active" style={{ backgroundColor: "#59B35E" }} />
                    <Tag tagValue="Medicare" style={{ backgroundColor: "#1077B0" }} />
                    <Tag tagValue="Really long tag..." style={{ backgroundColor: "#666666" }} />
                    <Tag tagValue="Maricopa County" style={{ backgroundColor: "#666666" }} />
                    <Tag tagValue="Product ID" style={{ backgroundColor: "#666666" }} />
                    <Tag tagValue="Extra tag with a long  value" style={{ backgroundColor: "#666666" }} />
                </Row>
            </div>
        )
    }
}

export default (MemberBasicInfo);