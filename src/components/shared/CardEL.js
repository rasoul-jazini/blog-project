import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

const CardEl = ({ title, slug, coverPhoto, author }) => {
  return (
    <Card sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", borderRadius: 4 }}>
      <CardHeader
        avatar={<Avatar src={author.avatar.url} sx={{ marginLeft: 2 }} />}
        title={
          <Typography component="p" variant="p" color="text.secondary">
            {author.name}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={coverPhoto.url}
        alt={slug}
      />
      <CardContent>
        <Typography
          component="h3"
          variant="h6"
          fontWeight={600}
          color="text.primary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </CardContent>
      <Divider variant="middle" sx={{ margin: "10px" }} />
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          sx={{ width: "100%", borderRadius: 3 }}
        >
          مطالعه مقاله
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardEl;
