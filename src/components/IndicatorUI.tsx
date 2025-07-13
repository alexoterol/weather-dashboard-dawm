
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

interface IndicatorUIProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // ícono en JSX o emoji string
  color?: string; // HEX o nombre
}

export default function IndicatorUI({ title, description, icon, color }: IndicatorUIProps) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1.5,
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 0,
          width: "100%",
        }}
      >
        {icon && (
          <div
            style={{
              padding: "0.5rem",
              borderRadius: "9999px",
              backgroundColor: `${color || "#e0e0e0"}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              lineHeight: 1,
              minWidth: "2.5rem",
              minHeight: "2.5rem",
            }}
          >
            <span style={{ color: color || "#1976d2" }}>{icon}</span>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
